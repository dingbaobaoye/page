//xiezhiquan 2018/07/31  page
//初始化page样式

//分页
function page(obj,num,url,callback,color){
    function  initCss(){
        $(obj).css('font-size','16px');
        $(obj).find('a').css({'display':'inline-block','border':'1px solid #868686','line-height':'31px','min-width':'28px','margin':'auto 5px','text-align':'center'});
        $(obj).find('a[disabled]').css({'cursor':'default','color':'#ddd','border-color':'#ddd'});
        $(obj).find('a.active').css({'color':color,'border-color':color});
        $(obj).find('.long_btn').css('width','82px');
    }
    //num一页多少条
    //总页数
    $(obj).empty();
    var all_page = $(obj).attr('data-page');
    if(all_page>1){
        var html='';
        html = '<a href="javascript:void(0);" class="long_btn">首页</a>' +
            '   <a href="javascript:void(0);" class="long_btn prev" disabled>上一页</a>' ;
        if(all_page >= 5){//大于5页，显示5页
            var page_num = 5;
        }else{//小于5页，显示全部页
            var page_num = all_page;
        }
        for (var i = 1;i <= page_num;i++){
            if(i==1){
                html+= '<a href="javascript:void(0);" class="active">1</a>';
            }else{
                html+= '<a href="javascript:void(0);">'+i+'</a>';
            }
        }
        html+= '<a href="javascript:void(0);" class="long_btn next">下一页</a>' +
            '       <a href="javascript:void(0);" class="long_btn">末页</a>';
        $(obj).append(html);
        initCss();
    }

    //点击a标签
    $(obj).on('click','a:not([disabled])',function(){
        // callback();
        var data = {};
        var type = $(obj).attr('data-type');
        data.type =type;
        var txt = $(this).text();
        // console.log(txt);
        if(txt=="首页"){
            data.currentPage = 1;
        }else if(txt=="末页"){
            data.currentPage = parseInt(all_page);
        }else if(txt == "上一页"){
            data.currentPage = ($(obj).find('a.active').text()-1);
        }else if(txt == "下一页"){
            data.currentPage = (parseInt($(obj).find('a.active').text())+1);
        }else{
            data.currentPage = parseInt(txt);
        }
        data.start = (data.currentPage-1)*5+1;
        data.length = num;
        $.ajax({
            url:url,
            data:data,
            dataType:'json',
            type:'POST',
            success:function(rel){
                callback(obj,rel);
                $(obj).empty();
                var prev_html ="",
                    next_html ="",
                    num_html ="",
                    num_start="",//显示页码起始页
                    num_end="";//显示页码结束页
                if(data.currentPage == 1){
                    prev_html = '<a href="javascript:void(0);" class="long_btn prev" disabled>上一页</a>' ;
                }else{
                    prev_html = '<a href="javascript:void(0);" class="long_btn prev">上一页</a>' ;
                }
                if(data.currentPage == all_page){
                    next_html = '<a href="javascript:void(0);" class="long_btn next" disabled>下一页</a>' ;
                }else{
                    next_html = '<a href="javascript:void(0);" class="long_btn next">下一页</a>' ;
                }
                if(all_page >= 5){
                    if(data.currentPage > all_page-2){
                        if(data.currentPage == all_page -1){
                            num_start = data.currentPage-3;
                            num_end = parseInt(all_page);
                        }else{
                            num_start = data.currentPage-4;
                            num_end = parseInt(all_page);
                        }
                    }else if(data.currentPage<3){
                        if(data.currentPage == 1){
                            num_start = 1;
                            num_end = parseInt(data.currentPage)+4;
                        }else{
                            num_start = data.currentPage-1;
                            num_end = parseInt(data.currentPage)+3;
                        }
                    }else{
                        num_start = data.currentPage-2;
                        num_end = parseInt(data.currentPage)+2;
                    }
                }else{
                    num_start = 1;
                    num_end = all_page;
                }
                for (var i = num_start;i <= num_end;i++){
                    if(i == data.currentPage){
                        // console.log(num_start+';'+num_end+';'+data.currentPage);
                        num_html+= '<a href="javascript:void(0);" class="active">'+i+'</a>';
                    }else{
                        num_html+= '<a href="javascript:void(0);">'+i+'</a>';
                    }
                }
                html = '<a href="javascript:void(0);" class="long_btn">首页</a>' +prev_html;
                html+=num_html;
                html+=  next_html+'<a href="javascript:void(0);" class="long_btn">末页</a>';
                $(obj).append(html);
                initCss();
            }
        })


    //    ajax试用



    })
    $(obj).on('mouseover','a:not([disabled]):not(.active)',function(){
        $(this).css({'background-color':color,'color':'#fff'});
    });
    $(obj).on('mouseout','a:not([disabled]):not(.active)',function(){
        $(this).css({'background-color':'#fff','color':'#666'});
    })

}