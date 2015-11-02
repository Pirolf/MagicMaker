FactoryGirl.define do
    sequence :username do |n|
        "testuser#{n}"
    end
    sequence :email do |n|
        "#{n}@miao.com"
    end
    factory :user do
        username
        email
        password "null123!"
        password_confirmation "null123!"
    end
end