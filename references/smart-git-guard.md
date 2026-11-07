# Smart Git Hook / Branch Guard: Hệ Thống Phòng Hộ Git Đa Tầng

> **Vị trí**: `d:\skill\scripts\git-guard/`  
> **Tích hợp CLI**: `swarm guard` / `swarm guard:install` / `swarm guard:watch`  
> **Chuẩn mực**: Zero-Trust Security, Conventional Commits, Ngăn ngừa rò rỉ token và tệp nhị phân nặng.

---

## 1. Kiến Trúc 4 Tầng Phòng Hộ (4-Layer Guard Architecture)

```
                            [Developer / AI Agent]
                                      │
                   git commit / git push / swarm run
                                      │
                                      ▼
               +---------------------------------------------+
               |        SMART GIT HOOK / BRANCH GUARD        |
               +----------------------+----------------------+
                                      │
         ┌────────────────────────────┼────────────────────────────┐
         ▼                            ▼                            ▼
  [1. Branch Guard]            [2. Secret Scanner]          [3. Binary Guard]
  • Cấm commit/push           • Quét 25+ định dạng         • Chặn file > 5MB
    trực tiếp vào:              secrets, tokens, keys:     • Chặn binary rác:
    main, master,               OpenAI, Anthropic,           .exe, .zip, .tar,
    production, release         AWS, GitHub PAT, JWT,        .pt, .ckpt, .iso
                                SSH Private Keys, DB URIs
                                      │
                                      ▼
                       [4. Conventional Commit Guard]
                       • type(scope?): description
                       • feat, fix, docs, refactor, perf...
                       • Tiêu đề <= 100 ký tự, không kết thúc bằng '.'
                                      │
                                      ▼
                       [✅ Cho phép Commit / Push]
```

---

## 2. Chi Tiết Các Tầng Bảo Vệ

### 📝 Tầng 1: Conventional Commits Guard (`commit-msg-checker.js`)
- **Mục tiêu**: Chuẩn hóa lịch sử git chuyên nghiệp theo đặc tả [Conventional Commits v1.0.0](https://www.conventionalcommits.org/).
- **Cú pháp bắt buộc**:
  ```text
  <type>(<scope?>): <mô tả ngắn gọn>
  ```
- **Các type hợp lệ**:
  - `feat`: Tính năng mới
  - `fix`: Sửa lỗi
  - `docs`: Cập nhật tài liệu
  - `style`: Định dạng code (khoảng trắng, dấu phẩy, không đổi logic)
  - `refactor`: Tái cấu trúc mã nguồn
  - `perf`: Cải thiện hiệu năng, giảm thời gian xử lý
  - `test`: Thêm hoặc sửa test
  - `build`: Thay đổi hệ thống build hoặc dependency
  - `ci`: Thay đổi cấu hình CI/CD
  - `chore`: Việc vặt, bảo trì định kỳ
  - `revert`: Hoàn tác commit trước

### 🔑 Tầng 2: Secret & Token Scanner (`secret-scanner.js`)
- **Mục tiêu**: Tuyệt đối không để lọt API Key, Token hay Password lên GitHub/GitLab.
- **Tập regex nhận diện tự động**:
  - `AKIA[0-9A-Z]{16}` (AWS Access Key ID)
  - `ghp_[0-9a-zA-Z]{36}` & `github_pat_*` (GitHub PAT)
  - `sk-proj-*` & `sk-*` (OpenAI API Key)
  - `sk-ant-*` (Anthropic Claude Key)
  - `AIza[0-9A-Za-z-_]{35}` (Google Gemini / Firebase Key)
  - `-----BEGIN (RSA|EC|OPENSSH)? PRIVATE KEY-----` (Khóa riêng tư SSH/RSA)
  - `xox[baprs]-*` (Slack Token)
  - `sk_live_*` & `rk_live_*` (Stripe Secret Key)
  - `postgres://...`, `mongodb+srv://...` (Chuỗi kết nối database có password)
- **Cơ chế chống báo động giả (False-Positive Suppression)**: Tự động bỏ qua placeholder an toàn (`your_api_key_here`, `test_token`, `.env.example`).

### 📦 Tầng 3: File Size & Binary Guard (`file-size-guard.js`)
- **Mục tiêu**: Ngăn chặn commit nhầm các file binary nặng gây phình to repo git vĩnh viễn.
- **Ngưỡng dung lượng mặc định**: **5 MB** (tùy biến qua `GIT_GUARD_MAX_FILE_SIZE_MB`).
- **Phát hiện định dạng nguy hiểm**:
  - Executable: `.exe`, `.dll`, `.so`, `.dylib`, `.bin`
  - Archive: `.zip`, `.tar.gz`, `.tar`, `.7z`, `.iso`, `.dmg`
  - Model weights: `.ckpt`, `.pt`, `.safetensors`, `.h5`, `.parquet`
  - Hướng dẫn chuyển sang **Git LFS** hoặc bổ sung vào `.gitignore`.

### 🛡️ Tầng 4: Branch Guard (`branch-guard.js`)
- **Mục tiêu**: Bảo vệ nhánh chính `main`, `master`, `production`, `prod`, `release`.
- Bắt buộc lập trình viên phải checkout nhánh tính năng (`git checkout -b feat/tinh-nang`) trước khi commit/push.
- Biến môi trường bypass khẩn cấp (cho trường hợp hotfix đặc biệt): `GIT_GUARD_ALLOW_MAIN=1`.

---

## 3. Các Lệnh Điều Khiển Qua CLI `swarm`

```bash
# 1. Kích hoạt và cài đặt tự động vào .git/hooks/
swarm guard:install

# 2. Quét kiểm tra toàn bộ workspace xem có rò rỉ secret hoặc file nặng không
swarm guard

# 3. Chạy daemon theo dõi thay đổi tệp tin thời gian thực
swarm guard:watch

# 4. Kiểm tra trước một commit message xem có hợp lệ không
swarm guard:check-msg "feat(auth): thêm đăng nhập 2FA OTP qua Gmail"
```

---

## 4. Tự Động Kích Hoạt Khi Dùng Git Gốc

Sau khi chạy `swarm guard:install`, các hook nằm trong `.git/hooks/` sẽ tự động chạy ngầm:
1. Mỗi khi gõ `git commit`, `pre-commit` tự động quét secret và dung lượng file.
2. Trình soạn commit message sẽ được `commit-msg` thẩm định theo chuẩn Conventional Commits.
3. Mỗi khi gõ `git push`, `pre-push` kiểm tra nhánh và cảnh báo nếu push thẳng lên main.
