---
title: 安装 Kitewell
---

Kitewell 是一款安装在你自己的 Mac 或 Windows PC 上的应用。安装只需几分钟，完成后你会得到一个空项目，可以直接开始搭建第一个工作流。

## 准备工作

- 运行 macOS 13 或更高版本的 Mac；或者运行 Windows 10（版本 1809 或更高）或 Windows 11 的 64 位 PC。
- 适用于你的系统的安装程序。[下载页面](/zh/download/)列出了目前提供的版本。如果你的系统不在其中，说明对应的安装包仍在准备中。

你不需要账户，也不需要 Python、Docker 或任何 AI 工具。等你的某个工作流用到它们时，再去安装即可。

## 在 Mac 上安装

1. 打开[下载页面](/zh/download/)，选择适合你的 Mac 的下载项。通过 **苹果菜单 → 关于本机** 可以查看它搭载的是 Apple 芯片还是 Intel 芯片。
2. 打开下载的 `.pkg` 文件，按照安装程序的提示操作。它会把 Kitewell 安装到“应用程序”文件夹，并要求输入管理员密码。
3. 从“应用程序”文件夹打开 **Kitewell**。
4. 选择 **登录以使用 Kitewell 的 AI**。浏览器会打开 Dagu Cloud，并显示一个需要你核对的代码。确认后，Kitewell 会创建你的第一个项目并打开它，AI 已可直接使用：无需 API 密钥，起步即有 100 个免费积分。如果要使用自己的 AI 密钥，或者不使用 AI，请改为选择 **在此设备上开始**。

Kitewell 首次运行时会开启 **登录时打开**，这样重启 Mac 后，你的计划仍会继续运行。你可以随时在菜单栏的菜单中将其关闭。

接下来，[搭建你的第一个工作流](/zh/docs/getting-started/)。

## 在 Windows 上安装

1. 打开[下载页面](/zh/download/)，下载 `Kitewell-<version>-win-x64-Setup.exe`。
2. 打开下载的文件。由于 Kitewell 是新的发布者，Windows 可能会显示 SmartScreen 提示。请先核对该文件的 SHA256 与下载项旁边显示的值一致，然后选择 **更多信息**，再选择 **仍要运行**。
3. Kitewell 会为你的用户账户自行完成安装，无需回答任何问题，也不需要管理员密码，安装完成后会自动打开。
4. 选择 **登录以使用 Kitewell 的 AI**。浏览器会打开 Dagu Cloud，并显示一个需要你核对的代码。确认后，Kitewell 会创建你的第一个项目并打开它，AI 已可直接使用：无需 API 密钥，起步即有 100 个免费积分。如果要使用自己的 AI 密钥，或者不使用 AI，请改为选择 **在此设备上开始**。

Kitewell 首次运行时会开启 **登录时启动**，这样重启电脑后，你的计划仍会继续运行。你可以随时在系统托盘的菜单中将其关闭。如果希望在任何人登录之前计划就能运行，请打开 **设备设置**，开启 **无人登录时也运行**；为了设置小型的 Kitewell 登录服务，Windows 会请求一次管理员批准，无需密码。

关闭窗口不会停止 Kitewell。它会继续在系统托盘中运行，也就是时钟旁边的那一小组图标。左键单击那里的 Kitewell 图标，即可重新打开窗口。

接下来，[搭建你的第一个工作流](/zh/docs/getting-started/)。

## 遇到问题时

- Windows 提示安装程序来自未知发布者。请将文件的 SHA256 与[下载页面](/zh/download/)上的值进行核对，然后选择 **更多信息** 和 **仍要运行**。如果 Windows 提示签名“无效”，请停止操作并[报告此问题](/zh/support/)，不要运行它。
- Kitewell 已安装，但打不开。Windows 的智能应用控制会拒绝加载未签名的 Kitewell 版本，而从发布页面下载的版本是已签名的。请参阅[故障排除](/zh/docs/troubleshooting/#kitewell-was-installed-but-did-not-start)。
- 窗口一片空白，或者 Kitewell 要求安装 WebView2。选择 **安装 WebView2**，大约需要一分钟。请参阅[故障排除](/zh/docs/troubleshooting/#kitewell-asks-to-install-webview2)。
- macOS 提示无法验证安装程序。请停止操作，并附上下载网址和版本号，[报告提示的原文](/zh/support/)。

## 在旧版本上安装新版本

请先保存你的编辑，并等正在运行的工作流完成。你的项目、运行记录以及登录时启动的设置都会保留，已在进行中的运行也会继续。

- 在 Mac 上，运行新的 `.pkg`。它会关闭正在运行的应用，将其替换，然后重启后台服务。编辑器中未保存的草稿会丢失。如果应用无法关闭，请在菜单栏中选择 **退出 Kitewell**，然后再次运行安装程序。
- 在 Windows 上，运行新的 Setup.exe。它会关闭正在运行的 Kitewell，将其替换，然后打开新版本；编辑器中未保存的草稿会丢失，因此请先保存。如果开启了登录服务，Kitewell 下次打开时会自行把该服务更新到新版本。

Kitewell 也可以自行获取新版本。请参阅[更新](/zh/docs/updates/)。

## 技术细节

- Windows 按用户安装应用，安装位置为 `%LOCALAPPDATA%\Kitewell.App`，不会出现管理员提示。你的数据单独存放在 `%LOCALAPPDATA%\Kitewell` 下。只有登录服务需要管理员提示：它会把程序复制到 `C:\Program Files\Kitewell`，并把数据一次性移到 `C:\ProgramData\Kitewell`。请参阅[计划](/zh/docs/scheduling/#run-with-nobody-signed-in-windows)。
- 静默安装（`Setup.exe --silent`）不显示任何内容，也从不请求管理员提示；登录服务只能在“设备设置”中设置。
- Kitewell 的窗口基于 Microsoft Edge WebView2 运行时构建。如果缺少该运行时，Kitewell 会在打开时提供安装。
- 全新安装会开启 **登录时启动**；之后的各次更新都会保留你上次在系统托盘中设置的状态。
- 在 Mac 上，`.pkg` 需要管理员密码，因为它会安装到“应用程序”文件夹。如果改为把 `Kitewell.app` 复制到你自己的 `~/Applications` 文件夹，则无需密码。
- Kitewell 提供的版本适用于搭载 Apple 芯片的 Mac、搭载 Intel 处理器的 Mac，以及搭载 Intel 或 AMD 处理器的 64 位 Windows PC。
