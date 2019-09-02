// 随机id
export default{
  randomId (num) {
    const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    let res = ''
    for (let i = 0; i < num; i++) {
      var id = Math.round(Math.random() * 9)
      res += chars[id]
    }
    return res
  }
}