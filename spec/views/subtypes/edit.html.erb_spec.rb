require 'rails_helper'

RSpec.describe "subtypes/edit", type: :view do
  before(:each) do
    @subtype = assign(:subtype, Subtype.create!())
  end

  it "renders the edit subtype form" do
    render

    assert_select "form[action=?][method=?]", subtype_path(@subtype), "post" do
    end
  end
end
