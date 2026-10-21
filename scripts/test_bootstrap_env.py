"""Regression tests for non-destructive local configuration generation."""

import contextlib
import io
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

import bootstrap_env


class BootstrapTests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.addCleanup(self.directory.cleanup)
        self.root = Path(self.directory.name)
        (self.root / "backend").mkdir()
        (self.root / "mobile").mkdir()
        self.patch = patch.object(bootstrap_env, "ROOT", self.root)
        self.patch.start()
        self.addCleanup(self.patch.stop)

    def run_bootstrap(self):
        output = io.StringIO()
        with contextlib.redirect_stdout(output):
            bootstrap_env.main()
        return output.getvalue()

    def test_second_run_preserves_all_files(self):
        self.run_bootstrap()
        paths = [
            self.root / ".env",
            self.root / "backend/.env",
            self.root / "mobile/.env",
        ]
        initial = {path: path.read_bytes() for path in paths}
        self.run_bootstrap()
        self.assertEqual(initial, {path: path.read_bytes() for path in paths})

    def test_reserved_password_characters_are_url_encoded_and_not_logged(self):
        (self.root / ".env").write_text("POSTGRES_PASSWORD=test@pass:word\n", encoding="utf-8")
        output = self.run_bootstrap()
        content = (self.root / "backend/.env").read_text(encoding="utf-8")
        self.assertIn("test%40pass%3Aword@127.0.0.1:5432", content)
        self.assertNotIn("test@pass:word", output)

    def test_existing_backend_configuration_is_never_overwritten(self):
        target = self.root / "backend/.env"
        target.write_text("existing-local-config\n", encoding="utf-8")
        self.run_bootstrap()
        self.assertEqual(target.read_text(encoding="utf-8"), "existing-local-config\n")

    def test_invalid_port_fails_before_creating_backend_configuration(self):
        (self.root / ".env").write_text(
            "POSTGRES_PASSWORD=test-only\nPOSTGRES_PORT=99999\n", encoding="utf-8"
        )
        with self.assertRaises(SystemExit), contextlib.redirect_stdout(io.StringIO()):
            bootstrap_env.main()
        self.assertFalse((self.root / "backend/.env").exists())


if __name__ == "__main__":
    unittest.main()
