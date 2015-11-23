require 'rails_helper'

RSpec.describe "types/index", type: :view do
  before(:each) do
    assign(:types, [
      Type.create!(),
      Type.create!()
    ])
  end

  it "renders a list of types" do
    render
  end
end
