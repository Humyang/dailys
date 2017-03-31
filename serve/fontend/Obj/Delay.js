var Delay = function(millisecond,func){
    this.index = ""
    this.millisecond = millisecond || 2000
    this.func = func
}
Delay.prototype.push = function(){
    clearTimeout(this.index)
    this.index = setTimeout(this.func, this.millisecond);
}
export default Delay