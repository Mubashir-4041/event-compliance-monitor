# GitHub Authentication Guide

## Issue: Permission Denied

You're getting this error because GitHub requires proper authentication to push code.

## ✅ Solution: Create a Personal Access Token

### Step 1: Create Personal Access Token

1. Go to: **https://github.com/settings/tokens**
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Configure your token:
   - **Note**: "Event Compliance Monitor - Push Access"
   - **Expiration**: 90 days (or your preference)
   - **Select scopes**: Check ✅ **`repo`** (Full control of private repositories)
4. Click **"Generate token"** at the bottom
5. **⚠️ IMPORTANT**: Copy the token immediately (you won't see it again!)
   - It looks like: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### Step 2: Push Using the Token

Once you have your token, run this command (replace `YOUR_TOKEN_HERE` with your actual token):

```bash
git push https://YOUR_TOKEN_HERE@github.com/Mubashir-4041/event-compliance-monitor.git master
```

**Example:**
```bash
git push https://ghp_abc123xyz789@github.com/Mubashir-4041/event-compliance-monitor.git master
```

### Step 3: Set Up Credential Storage (Optional)

To avoid entering the token every time, configure Git to remember it:

```bash
# Windows - Store credentials permanently
git config --global credential.helper wincred

# Then push again with token
git push -u origin master
```

## Alternative Method: GitHub CLI

If you have GitHub CLI installed:

```bash
# Login to GitHub
gh auth login

# Then push normally
git push -u origin master
```

## Alternative Method: SSH Key

1. Generate SSH key:
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

2. Add to GitHub: https://github.com/settings/keys

3. Change remote to SSH:
```bash
git remote set-url origin git@github.com:Mubashir-4041/event-compliance-monitor.git
git push -u origin master
```

## Quick Fix for Now

The fastest way is to use the Personal Access Token method (Step 1 & 2 above).

---

**Need Help?** Check GitHub's official docs: https://docs.github.com/en/authentication

