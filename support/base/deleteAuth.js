import fs from "fs";

export default async function globalTeardown() {
  if (fs.existsSync("test_data/auth.json")) {
    fs.unlinkSync("test_data/auth.json");
  }
}
