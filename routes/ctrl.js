module.exports = function (app, routes) {
    //查询Service
    app.post('/service/:sql',routes.servicedo);
};