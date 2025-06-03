 # Developer Workspace Setup for Codex CLI on Windows

 This guide walks you through setting up and running the Codex CLI (an agentic coding assistant) on a Windows development environment.

 ## Prerequisites
 - Windows 10 or later
 - Git for Windows: https://git-scm.com/download/win
 - Python 3.8+ and pip: https://www.python.org/downloads/windows/
 - An OpenAI API key (sign up at https://platform.openai.com/)
 - [Optional] Windows Subsystem for Linux (WSL) for a Unix-like shell experience
 - [Optional] Visual Studio Code or your preferred code editor

 ## Installation

 ### 1. Clone the Codex CLI repository
 Open PowerShell or Command Prompt and run:
 ```powershell
 git clone https://github.com/openai/codex-cli.git
 cd codex-cli
 ```

 ### 2. Install dependencies
 ```powershell
 pip install -r requirements.txt
 pip install -e .
 ```

 *Alternatively*, if published on PyPI, you can install directly:
 ```powershell
 pip install codex-cli
 ```

 ### 3. Configure your API key
 In PowerShell:
 ```powershell
 setx OPENAI_API_KEY "<your-api-key>"
 ```
 Then restart your terminal to load the environment variable.

 ## Verifying the installation
 ```powershell
 codex --version
 ```
 You should see the installed version of Codex CLI.

 ## Common Commands

 - Show help and global options:
   ```powershell
   codex --help
   ```

 - Run Codex with prompt-based approval (default):
   ```powershell
   codex --workspace C:\path\to\project
   ```

 - Run Codex in full-auto mode (no prompts):
   ```powershell
   codex --workspace C:\path\to\project --approval-mode full-auto
   ```

 - Run a dry run to preview changes without applying:
   ```powershell
   codex --workspace . --dry-run
   ```

 - Specify a custom OpenAI model (e.g., gpt-4):
   ```powershell
   codex --model gpt-4 --approval-mode prompt
   ```

 - Increase logging verbosity for debugging:
   ```powershell
   codex --verbose
   ```

 - Limit number of interaction turns:
   ```powershell
   codex --max-turns 5
   ```

 ## Advanced Usage
 - Interactive shell mode:
   ```powershell
   codex shell
   ```
 - Reading and applying a saved session:
   ```powershell
   codex --load-session session.json
   ```

 ## Tips
 - Ensure `codex` is in your PATH; if not, add the Python Scripts folder (e.g., `C:\Users\<User>\AppData\Roaming\Python\Python39\Scripts`) to your PATH.
 - Use WSL for more consistency with Linux-based CI environments.
 - Combine flags as needed for CI/CD pipelines (e.g., `codex --approval-mode full-auto --dry-run`).

 ---
 *This README was generated to streamline your Windows setup for Codex CLI.*
