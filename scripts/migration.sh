#!/usr/bin/env bash

RED='\033[0;31m'
NC='\033[0m' # No Color

CMD=$1
STAGE=$2
TABLE=$2

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
STAGES="local|sit|uat|prod"
STAGES_PATTERN="^($STAGES)$"

migrationWithStage() {
    # backup original environment.ts
    cp src/envs/environment.ts src/envs/.environment.ts
    # cp argument specific environment
    cp src/envs/${STAGE}.ts src/envs/environment.ts

    migration $1 $2 $3

    # recover original environment
    mv src/envs/.environment.ts src/envs/environment.ts
}

migration() {
    TS_NODE_FILES=true node ${DIR}/../node_modules/.bin/ts-node \
        ${DIR}/../node_modules/typeorm/cli.js \
        --config src/configs/typeorm.config-migration.ts \
        migration:$1 $2 $3
}

migrationCreate() {
    TS_NODE_FILES=true node ${DIR}/../node_modules/.bin/ts-node \
        ${DIR}/../node_modules/typeorm/cli.js \
        --config src/configs/typeorm.config-migration.ts \
        migration:create -d src/migrations $1 $2 $3
}

validateStage() {
    if ! [[ ${STAGE} =~ $STAGES_PATTERN ]]; then
        usage
    fi
}

run() {
    validateStage
    migrationWithStage run
}

revert() {
    validateStage
    migrationWithStage revert
}

create() {
    migration create -n ${TABLE}
}

usage() {
    echo -e "${RED}Usage: $0 [run|revert] [local|sit|uat|prod]${NC}"
    echo -e "${RED}Usage: $0 [create] [table-to-create]${NC}"
    exit 1
}

case "$CMD" in
  run)
    run ${STAGE}
    ;;
  revert)
    revert ${STAGE}
    ;;
  create)
    create ${TABLE}
    ;;
  *)
    usage
    ;;
esac
