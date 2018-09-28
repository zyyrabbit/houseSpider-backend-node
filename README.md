# houseSpider-backend-node
An back-end node project spider about house.

### run

1. git clone https://github.com/zyyrabbit/houseSpider-backend-node.git
2. npm install
3. npm run dev
4. 打开postMan 输入地址 http://127.0.0.1:3000/house/douban?pageNo=30&positionCity=广州&keywords=天河客运站
 - pageNo： 爬取页数
 - positionCity：定位城市
 - keywords: 关键字（支持多个关键字）

目前支持的城市列表，可以自行添加其他豆瓣的城市租房：

![address](https://user-gold-cdn.xitu.io/2018/9/28/1661f136280ee47d?w=1179&h=713&f=png&s=155678)

结果如下图所示：

![result](https://user-gold-cdn.xitu.io/2018/9/28/1661f13c7756d750?w=1171&h=791&f=png&s=81627)

5. 支持mysql数据库存储，配置文件

![db](https://user-gold-cdn.xitu.io/2018/9/28/1661f128071a6af4?w=994&h=654&f=png&s=92661)

