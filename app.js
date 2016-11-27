var fs = require('fs');
var Docxtemplater = require('docxtemplater');
var JSZip = require('jszip');
var ImageModule=require('docxtemplater-image-module')

//exempleImageCarte
var content = fs.readFileSync(__dirname+"/imageExample.docx","binary");

var opts = {};
opts = {
  getImage: function (tagValue) {
    return fs.readFileSync(tagValue, "binary");
  },
  getSize: function () {
    return [150, 150];
  },
  centered: false,
};

var imageModule=new ImageModule(opts);

var data = { image: 'examples/image.png' }
var zip = new JSZip(content);
var docx=new Docxtemplater()
    .loadZip(zip)
    .setData(data)
    .attachModule(imageModule)
    .render();

var buffer= docx
        .getZip()
        .generate({type:"nodebuffer"});
        console.log(docx)
fs.writeFile("imageExample_output.docx",buffer);

