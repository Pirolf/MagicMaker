module ApplicationHelper
	def javascript(*files)
  		content_for(:head) { javascript_include_tag(*files) }
	end

	def header(page_title)
		content_for :title, page_title
	end
	
	def resource_name
		:user
	end

	def resource
		@resource ||= User.new
	end

	def devise_mapping
		@devise_mapping ||= Devise.mappings[:user]
	end
end
