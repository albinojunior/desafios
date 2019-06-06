# Resolução do Desafio 1: Strings

## Prerequisites/Dependencies

- Requires node installed

## Running
- go to `strings/resolution` dir and run following command:

```bash
node parser-cli.js
```
- setting custom arguments for command:

``` 
//setting custom txt file | Ex: --file-txt=input.txt (default: input.txt)

--file-txt=VALUE 

//setting row caracters limit | Ex: --limit=40 (default: 40)

--limit=VALUE 

//setting justify text flag | Ex: --justify=true (default: false)

--justify=(true|false)
```

- Using all arguments:
```bash
node parser-cli.js --file-txt=input.txt --limit=40 --justify=true
```

- After run open the output.txt file for view result.