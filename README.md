# resume-maker

A node CLI application that injects a YAML or JSON file into a handlebars theme and outputs a PDF or HTML formatted resume.

Compatible with themes from [json-resume](https://github.com/json-resume).


## Install

```
npm i -g tecfu/resume-maker#master
```


## Usage

```
resume-maker --search ./path/to/yourresume.json --schema [your schema name] --theme [your theme]
```


## Options 

```
Options:

  --search  Glob search pattern for JSON file(s) you are using as input.             
                                      [required]
  --format  Output format.            [choices: "pdf", "html", "stdout"] [default: "pdf"]
  --theme   Name of the theme you want to use. Install built-in themes with "npm
            install $theme_name" and pass $theme_name as the arg value.
                                      [default: "jsonresume-theme-stackoverflow"]
  --css     Specify a stylesheet to override styles in your theme.
                                      [default: null]
  --dir     Specify an output directory.
                                      [default: null]
  --schema  Validation schema. Install new schemas with "npm
            install $schema_name" and pass $schema_name as the arg value.
                                      [default: null]
```


## Pre-installed Themes

- jsonresume-theme-stackoverflow


## Compatible Themes

- Compatible with all themes listed at [https://jsonresume.org/themes/](https://jsonresume.org/themes/)


### Installing Themes

You can simply install a theme globally and resume-maker will find it.

```
$ npm install -g themename 
```
