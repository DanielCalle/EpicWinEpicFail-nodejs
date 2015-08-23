module.exports = function (data) {
  if(data === undefined) return null;
  try{
    return JSON.parse(data);
  }
  catch(e){
    return 0;
  }
};
