// custom delay function
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

$(document).ready(function(){
	// initial QRcode
	$('#qrcode').ClassyQR({
	    type: 'url',
    	url: 'https://www.qrcode.com'
	});

	$("#copy_to_clipboard").click(async function(){
		const value = $("#shortened_url").attr("value");
		if(value != "")
		{
			$("#shortened_url").select();
			document.execCommand("copy");
			
			$('#copy_to_clipboard').popover("show");
			$('#copy_to_clipboard').css("background-image", "url('/static/images/copy_to_clipboard_black.png')");
			await delay(3000);
			$('#copy_to_clipboard').popover("hide");
			$('#copy_to_clipboard').css("background-image", "url('/static/images/copy_to_clipboard_white.png')");
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
});