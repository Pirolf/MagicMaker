FactoryGirl.define do
    sequence :type_name do |n|
        "testtype_#{n}"
    end
    
    factory :type do
        name :type_name
        user
    end
end
