require 'rails_helper'

RSpec.describe "types/show", type: :view do
  before(:each) do
    @type = assign(:type, Type.create!())
  end

  it "renders attributes in <p>" do
    render
  end
end
