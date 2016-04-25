#!/usr/bin/env bash

function genrerateIndexJS {
    directory=${1}
    files=${directory}/*
    indexJS="$directory/index.js"
    indexJSHasCleaned=false

    for file in ${files}; do
        filename=$(basename "$file")
        extension="${filename##*.}"
        filename="${filename%.*}"

        # ignora arquivos com caracteres inválidos (- por ex)
        if [[ "$filename" =~ [^a-zA-Z0-9_] ]]; then
            continue
        fi

        # ignora index.js, já que vamos gerá-lo
        if [ "$filename" = "index" ]; then
            continue
        fi

        # ignora o que não for js ou jsx
        if [ "$extension" != "js" ] && [ "$extension" != "jsx" ]; then
            continue
        fi

        # aceita apenas arquivos com "export "
        if grep -q "^export " ${file}; then
            if [ ${indexJSHasCleaned} = false ]; then
                 > ${indexJS} #limpa conteúdo
                 indexJSHasCleaned=true
            fi
            echo "export {default as $filename} from './$filename'" >> ${indexJS}
        fi
    done
}

for directory in $(find $1 -type d);
do
    genrerateIndexJS ${directory}
done