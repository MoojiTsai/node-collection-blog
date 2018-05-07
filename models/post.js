const Portfolio = require('../lib/mongo').PortfolioModel 

module.exports = {
    // 注册一个用户
    createPortfolio:  (post)=> {
        let data = new Portfolio(post);
        data.save(function (err, result) {
            if (err) console.error(err);
            return err; 
        });
        return Portfolio;
    },

    getPortfolios:()=>{
        return Portfolio.find({});
    },
    getPortfolio:(id)=>{
        return Portfolio.findOne({_id:id});
    },
    getPortfoliosByCateory:(categories)=>{
        return Portfolio.find({categories:{$regex: categories, $options: 'i'}});
    },
    updatePortfolio:(id,data)=>{
        return Portfolio.findByIdAndUpdate(id,data);
    },
    deletePortfolio:(id,data)=>{
        return Portfolio.findByIdAndRemove(id); 
    },
    


}
