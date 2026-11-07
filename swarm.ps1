$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
node "$ScriptDir\swarm.js" @args
