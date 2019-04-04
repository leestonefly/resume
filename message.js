!function () {
    // var AV = require('leancloud-storage');
    var {Query, User} = AV;

    // var { Query, User } = AV;
    // AV.init('appId', 'appKey');

    var view = document.querySelector('section.message')
    var model = {
        init: function () {
            var APP_ID = 'n7wcnnM2UHrberhgQC0FKa5z-gzGzoHsz';
            var APP_KEY = 'AM9qLazAjSQNPts4AlLVUDJx';
            AV.init({appId: APP_ID, appKey: APP_KEY});
        },
        //获取数据
        fetch: function () {
            var query = new AV.Query('message')
            return query.find();
        },
        //上传数据
        save: function (name, content) {
            let Message = AV.Object.extend('message');
            let message = new Message();
        
            return message.save({
                'content': content,
                'name': name,
            })
        }
    };
    var controller = {
        view: null,
        model:null,
        messageList:null,
        init: function (view,model) {
            this.view = view;
            this.model=model;

            this.messageList = view.querySelector('#messageList');
            this.form = view.querySelector('form');
            this.model.init();
            this.loadMessages();
            this.bindEvenets();
        },
        loadMessages: function () {
            model.fetch().then(
                (messages) => {
                    let array = messages.map((item) => item.attributes);
                    array.forEach((item) => {
                        let li = document.createElement('li');
                        li.innerText = `${item.name}: ${item.content}`;
                        this.messageList.appendChild(li);
                    })
                },function (error) {
                    // fetch异常处理
                    console.log(error);
                }
            ).then(function (messages) {

            },(error) => {
                console.log(error)
            })
        },
        bindEvenets: function(){
            this.form.addEventListener('submit', function(e){
                e.preventDefault();
                this.saveMessage();
            }.bind(this));
        },
        saveMessage: function () {
            let myForm = document.querySelector('#postMessageForm');
            let content = myForm.querySelector('input[name=content]').value;
            let name = myForm.querySelector('input[name=name]').value;
            if(content===''||name===''){
                alert('姓名或内容不能为空')
                return
            }
            this.model.save(name,content).then(function (object) {
                let li = document.createElement('li');
                li.innerText = `${object.attributes.name}: ${object.attributes.content}`;
                let messageList = document.querySelector('#messageList');
                messageList.appendChild(li);
                myForm.querySelector('input[name=content]').value = '';
                myForm.querySelector('input[name=name]').value = '';
            },(error)=>{
                console.log(error);
            });

        }
    };
    controller.init(view,model);

}();
