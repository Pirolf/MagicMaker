FactoryGirl.define do
    sequence :subtype_name do |n|
    	"testsubtype_#{n}"
	end

	factory :subtype do
		name :subtype_name
		type
		user
	end
end
