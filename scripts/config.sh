#!/usr/bin/env bash

RED='\033[0;31m'
NC='\033[0m' # No Color

STAGES="local|sit|uat|prod"
STAGES_PATTERN="^($STAGES)$"
STAGE=$1

usage() {
    echo -e "${RED}current" `grep NODE_ENV envs/environment.ts` "${NC}"
    echo -e "${RED}Usage: $0 [${STAGES}]${NC}"
    exit 1
}

config() {
    cp src/envs/${STAGE}.ts src/envs/environment.ts
}

if [[ ${STAGE} =~ $STAGES_PATTERN ]]; then
    config ${STAGE}
else
    usage
fi
