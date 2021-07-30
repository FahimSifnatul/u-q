from django.shortcuts import render, redirect, reverse
from django.views import View
from django.http import HttpResponseRedirect, JsonResponse
from secrets import token_urlsafe
from django.db import connection, close_old_connections

# Create your views here.
class Home(View):
	def get(self, request, url="", *args, **kwargs):
		if url == "" :
			context = {}
			return render(request, 'index.html', context)
		else:
			cursor = connection.cursor()
			sql    = "SELECT OriginalURL FROM URL WHERE ShortenedURL='"+url+"'"
			
			flg = cursor.execute(sql)
			if flg == 0:
				context = {}
				return render(request, 'index.html', context)

			redirect_url = ""
			for record in cursor.fetchone():
				redirect_url = record

			return redirect(redirect_url)

	def post(self, request, *args, **kwargs):
		cursor = connection.cursor()

		shortened_url, sql = "", ""
		for _ in range(100):
			shortened_url = token_urlsafe(4)
			sql = "SELECT ShortenedURL FROM URL WHERE ShortenedURL='"+shortened_url+"'"
			flg = cursor.execute(sql)
			if(flg == 0): 
				break
		
		sql = "INSERT INTO URL(OriginalURL, ShortenedURL) \
			   VALUES('"+request.POST.get("original_url")+"', '"+shortened_url+"')"
		cursor.execute(sql)

		context = {
				'shortened_url' : shortened_url
		}
		return JsonResponse(context, safe=False)