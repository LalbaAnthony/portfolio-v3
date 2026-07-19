# Portfolio V3

---

## 🚀 - Quick start

```ps1
# Clone the repo
git clone git@github.com:LalbaAnthony/portfolio-v3.git

# Move into the project directory
cd portfolio-v3

# Copy .env.example file to .env and fill in the required environment variables.
if (Test-Path ".env") { Remove-Item ".env" -Force }
Copy-Item ".env.example" ".env"

npm run docker:dev
```

---

## 📝 - License

See the [LICENSE.md](LICENSE.md) file for details.
