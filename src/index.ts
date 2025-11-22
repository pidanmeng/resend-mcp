#!/usr/bin/env node
import { FastMCP } from 'fastmcp';
import { sendEmail } from './tools/sendEmail';
import { sendEmailBatch } from './tools/sendEmailBatch';

const server = new FastMCP({
  name: 'MCP Template',
  version: '1.0.1',
});

server.addTool(sendEmail);
server.addTool(sendEmailBatch);

server.start({
  transportType: 'stdio',
});
