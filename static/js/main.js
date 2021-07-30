
$(document).ready(function(){
	$('#qrcode').ClassyQR({
	    type: 'url',
    	url: 'https://www.qrcode.com'
	});

	$("#copy_to_clipboard").click(function(){
		const value = $("#shortened_url").attr("value");
		if(value != "")
		{
			$("#shortened_url").select();
			document.execCommand("copy");
			alert("Shortened URL copied");
		}
	});

	$("#form_url").on("submit", function(e){
		e.preventDefault(); // to prevent page reloading;

		$.ajax({
			type: "POST",
			data: $("#form_url").serialize(),
			success: function(returned_data){
				const shortened_url = "u-q.herokuapp.com/"+returned_data["shortened_url"];
				
				$("#shortened_url").attr("value", shortened_url);
				$("#qrcode").ClassyQR({
					type: 'url',
					url: shortened_url
				});
			},
			error: function(){
				alert("Something gone wrong!");
			}
		});
	});
})