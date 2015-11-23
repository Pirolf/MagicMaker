require 'rails_helper'

RSpec.describe "subtypes/new", type: :view do
  before(:each) do
    assign(:subtype, Subtype.new())
  end

  it "renders new subtype form" do
    render

    assert_select "form[action=?][method=?]", subtypes_path, "post" do
    end
  end
end
