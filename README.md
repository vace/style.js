# style.js
modify the element style fast and safety and auto prefixes.just 2kb

安全简单快速修改元素的style~只有2kb哦

## usega

`npm install style.js`

`style(selecors,css)`


**CDM**

`var style = require('style')`

**AMD**

`define(['style'],function(style){})`

**ES6**

`import style from 'style'`


## Example

```javascript
var qs = function(q){return document.querySelector(q)}

// elements string style
style('.box','width:200px;height:200px;background:red')
// 
style('.box',{float:'left',margin:'15px'})
for(var a = 1; a <= 4 ; a ++){
    style('.box'+a,{animation:'pulse 0.6s '+ (a-1) + 's'})
}
//1
style(qs('.box1'),{background:'blue',filter:'blur(5px)'})

//2
style('.box2',{background:'purple'})

style(['.box3','.box4'],{background:'#673ab7',border:'5px solid #4caf50'})

style(['.box3',qs('.box4')],{boxShadow:'5px 5px 8px #FF9800'})
```


## License
`style.js` is licensed under [The MIT License](LICENSE).
