# resend-mcp

这是一个基于 [FastMCP](https://github.com/fastmcp/fastmcp) 框架构建的 MCP (Model Context Protocol) 工具包。

## 功能

当前实现了一个邮件发送工具：
- `sendEmail`: 使用 Resend 服务发送邮件

## 安装依赖

```bash
bun install
```

## 运行项目

```bash
bun run dev
```

##  调试项目

```bash
bun run inspect
```

## 构建项目

```bash
bun run build
```

## 部署 MCP

```JSON
{
  "mcpServers": {
    "resend-mcp": {
      "args": ["-y","@pidanmoe/resend-mcp"],
      "command": "npx",
      "env": {
        "RESEND_API_KEY": "<YOUR_RESEND_API_KEY>",
        "EMAIL_HOST": "<YOUR_EMAIL_HOST>"
      }
    }
  }
}
```

## 环境变量

- `RESEND_API_KEY`: Resend API 密钥
- `EMAIL_HOST`: 邮件域名，例如 `example.com`

## 项目结构

- [index.ts](file:///Volumes/SSD/_work/resend-mcp/index.ts): 主入口文件，初始化并启动 FastMCP 服务器
- [tools/sendEmail.ts](file:///Volumes/SSD/_work/resend-mcp/src/tools/sendEmail.ts): 实现了 `sendEmail` 工具，支持通过 Resend 发送邮件
- [utils/logger.ts](file:///Volumes/SSD/_work/resend-mcp/utils/logger.ts): 日志工具模块

## 使用说明

该项目遵循 Model Context Protocol 规范，可以通过标准 I/O 或其他传输方式与支持 MCP 的客户端进行通信。

## 技术栈

- [Bun](https://bun.sh) - JavaScript/TypeScript 运行时
- [FastMCP](https://github.com/fastmcp/fastmcp) - MCP 框架
- [Resend](https://resend.com) - 邮件发送服务
- [Zod](https://zod.dev) - TypeScript-first schema declaration and validation library

---

此项目使用 bun v1.2.19 创建。[Bun](https://bun.com) 是一个快速的一体化 JavaScript 运行时。