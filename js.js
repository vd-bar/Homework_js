window.addEventListener('load',function (){

    var sel;
    function creatCuurentList(list) {
        var select=document.createElement('select');
        select.className='select';
        var option=document.createElement('option');
        option.textContent="Выберите валюту";
        select.appendChild(option);
        list.forEach(function (currency) {
            var option=document.createElement('option');
            option.value=currency.Cur_Abbreviation;
            option.textContent=currency.Cur_Name;
            select.appendChild(option);
        });



        return select;
    }

    function loadCurrencyRate(code,callback) {

        var xhr=new XMLHttpRequest();
        xhr.open('GET','http://www.nbrb.by/API/ExRates/Rates/'+ code + '?ParamMode=2',true);
        xhr.responseType='json';
        xhr.addEventListener('loadend',function listener() {
            xhr.removeEventListener('loadend',listener);
            callback(xhr.response);

        });
        xhr.send();

    }
    var xhr=new XMLHttpRequest();
    xhr.open('GET','http://www.nbrb.by/API/ExRates/Currencies',true);
    xhr.responseType='json';
    xhr.addEventListener('loadend',function listener() {xhr.removeEventListener('loadend',listener);
        var select=creatCuurentList(xhr.response);
        select.addEventListener('change',function () {
            var currencyCody=select.value;
            loadCurrencyRate(currencyCody,function (rate) {
                sel=rate;
                // console.log(rate);
            });

        });

        document.body.appendChild(select);

    });


    xhr.send();
    document.body.appendChild(add());
    function add(){
        var tx=document.createElement('input');
        tx.className='text';
        tx.style.display='block';
        tx.style.marginTop='20px';
        tx.placeholder="Введите суммму BY";

        return tx;

    }

    document.body.appendChild(addButton());

    function addButton() {
        var but=document.createElement('button');
        but.className='butt';
        but.style.width='50px';
        but.style.height='30px';
        but.style.marginTop='20px';
        but.style.marginRight='50px';
        but.textContent='OK ';
        return but;
    }
    var s=document.querySelector('.butt');

    function ClickButt(event) {
        var butr=event.target;
        if(butr.matches('.butt')){
            var a=document.querySelector('.text');
            var num=a.value;
            var curr=document.querySelector('.select');
            var c= sel.Cur_OfficialRate;

            alert(num/c+" "+sel.Cur_Name);
        }

    }
    document.body.addEventListener('click',ClickButt);

});
