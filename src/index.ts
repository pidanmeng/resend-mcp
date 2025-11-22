#!/usr/bin/env node
import { FastMCP } from 'fastmcp';
import { sendEmail } from './tools/sendEmail';

const server = new FastMCP({
  name: 'MCP Template',
  version: '1.0.0',
});

server.addTool(sendEmail);

server.start({
  transportType: 'stdio',
});
