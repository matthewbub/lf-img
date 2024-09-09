# lf-img

A local first image manager for static sites

## Set Up

```sh
# TODO
# npx lf-img init
```

```sh
# TODO
# npx lf-img move -f ./path/to/image.png
```

## Dev usage

```sh
pnpm run build
node dist/index.js init

# move an image
node dist/index.js move --file ./path/to/image.png --name image.png --upsert
```

The `config.json` file is used to store the target directory for the images.

## Roadmap

- [x] move file to a configured directory
- [x] rename file
- [x] prevent unintentional overwrites
- [ ] resize image?
- [ ] compress image?
