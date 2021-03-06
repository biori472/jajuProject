//리스트
$(function(){
	$.ajax({
		type: 'post',
		url: '/jaju/reviewboard/getReviewboardList',
		data: 	{
			'pg':$('#pg').val(),
			'id':$('#id').val()
		}, 
		dataType: 'json',
		success: function(data) {
			//alert(JSON.stringify(data))
			
			 if(JSON.stringify(data.list)=='[]'){
				 $('#reviewboardListTable tr').remove();
					$('<tr/>').append($('<div/>',{
						align:'center',
						text:'등록된 게시물이 없습니다',
						style:'height:500px; width:1000px; line-height:500px;'
					})).appendTo($('#reviewboardListTable'));
				}
			 
			 else {
			
			$.each(data.list, function(index, items){
				 $('<tr/>').append($('<td/>',{
		               align:'center',
		               text: items.review_seq
		               
		            })).append($('<td/>',{
			               
		               }).append($('<img/>',{
		            	   src:'/jaju/storage/'+items.sale_image1,
		            	   alt:'img',
		            	   style:'text_align:left; width:150px; height:100px;',
			               id: 'item_img',
		                  
		               })) 
		            ).append($('<td/>',{
			               
		               }).append($('<a/>',{
		            	   href: '#',
			               text: items.review_subject,
			               id: 'item',
		                  
		               })) 
		            ).append($('<td/>',{
		               align:'center',
		               text: items.review_id
		               
		            })).append($('<td/>',{
		               align:'center',
		               text: items.review_date
		               
		            })).append($('<td/>',{
		               align:'center',
		               text: items.review_hit
		               
		            })).appendTo($('#reviewboardListTable'));
				
			}); //each
			
			$(document).on('click', '#item', function(){ //a태그에 아이디 준거 subjectA 그거의 부모 찾고 그 부모의 앞에거를 찾고
				if($('#id').val() == ''){
						alert("먼저 로그인 하세요");
					}else {
	               var seq = $(this).parent().prev().prev().text();
	               //alert(seq);
	               location.href = '/jaju/reviewboard/reviewboardView?review_seq='+seq+'&pg='+$('#pg').val();
	               //location.href = '/jaju/freeboard/freeboardView?board_seq='+seq+'&pg='+$('#pg').val();
					}
	         });
			
			$(document).on('click', '#item_img', function(){ //a태그에 아이디 준거 subjectA 그거의 부모 찾고 그 부모의 앞에거를 찾고
				if($('#id').val() == ''){
						alert("먼저 로그인 하세요");
					}else {
	               var seq = $(this).parent().prev().text();
	               //alert(seq);
	               location.href = '/jaju/reviewboard/reviewboardView?review_seq='+seq+'&pg='+$('#pg').val();
	               //location.href = '/jaju/freeboard/freeboardView?board_seq='+seq+'&pg='+$('#pg').val();
					}
	         });
			
			

		  //페이징 처리
		$('#reviewboardpagingDiv').html(data.reviewboardPaging.pagingHTML);		
			 }//else
	}, 
		error:function(err){
		console.log(err);
		alert('error');
	}
});
});

//페이징

//function reviewboardPaging(pg){
//	location.href="reviewboardList?pg="+pg;
//}


//검색

 $('#reviewboardSearchBtn').click(function(){
	//alert($('input[name=pg]').val());
	//alert($('#pg').val());
	//alert('이미지클릭')
	 $('#search_review').val($('#keyword').val());
	if($('#keyword').val() == ""){
		alert("검색어를 입력해 주세요");
		$('#keyword').focus();
	}  else{
	
	$.ajax({
		type: 'post',
		url: '/jaju/reviewboard/getReviewboardSearchList',
		data: $('#reviewboardSearchList').serialize(),
		dataType: 'json',
		success: function(data){
			//alert(JSON.stringify(data));
			
			$('#reviewboardListTable tr:gt(0)').remove();
			
			   if(data.list.length == 0){
				   alert('해당 키워드로 검색한 내용이 없습니다.');
				   location.href = '/jaju/reviewboard/reviewboardList?pg=1'
				   
			   }else{
				   
			  $.each(data.list, function(index, items){
				 $('<tr/>').append($('<td/>',{
		               align:'center',
		               text: items.review_seq
		               
		            })).append($('<td/>',{
			               
		               }).append($('<img/>',{
		            	   src:'/jaju/storage/'+items.sale_image1,
		            	   alt:'img',
		            	   style:'text_align:left;',
			               id: 'item',
		                  
		               })) 
		            ).append($('<td/>',{
			               
		               }).append($('<a/>',{
		            	   href: '#',
			               text: items.review_subject,
			               id: 'item',
		                  
		               })) 
		            ).append($('<td/>',{
		               align:'center',
		               text: items.review_id
		               
		            })).append($('<td/>',{
		               align:'center',
		               text: items.review_date
		               
		            })).append($('<td/>',{
		               align:'center',
		               text: items.review_hit
		               
		            })).appendTo($('#reviewboardListTable'));
				
			}); //each
			  
			  $(document).on('click', '#item', function(){

		               var seq = $(this).parent().prev().text();
		               location.href = '/jaju/reviewboard/reviewboardView?review_seq='+seq;
			  });
			  
			  
			   }
			   
			$('#reviewboardpagingDiv').html(data.reviewboardPaging.pagingHTML);		
			
		}, error: function(err){
			console.log(err);
			alert('검색 리스트 생성 오류');
			
		}
	});

	return false;
	}
});

 