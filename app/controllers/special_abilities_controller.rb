class SpecialAbilitiesController < ApplicationController
  before_action :set_special_ability, only: [:show, :edit, :update, :destroy]

  # GET /special_abilities
  # GET /special_abilities.json
  def index
    @special_abilities = SpecialAbility.all
  end

  # GET /special_abilities/1
  # GET /special_abilities/1.json
  def show
  end

  # GET /special_abilities/new
  def new
    @special_ability = SpecialAbility.new
  end

  # GET /special_abilities/1/edit
  def edit
  end

  # POST /special_abilities
  # POST /special_abilities.json
  def create
    @special_ability = SpecialAbility.new(special_ability_params)

    respond_to do |format|
      if @special_ability.save
        format.html { redirect_to @special_ability, notice: 'Special ability was successfully created.' }
        format.json { render :show, status: :created, location: @special_ability }
      else
        format.html { render :new }
        format.json { render json: @special_ability.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /special_abilities/1
  # PATCH/PUT /special_abilities/1.json
  def update
    respond_to do |format|
      if @special_ability.update(special_ability_params)
        format.html { redirect_to @special_ability, notice: 'Special ability was successfully updated.' }
        format.json { render :show, status: :ok, location: @special_ability }
      else
        format.html { render :edit }
        format.json { render json: @special_ability.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /special_abilities/1
  # DELETE /special_abilities/1.json
  def destroy
    @special_ability.destroy
    respond_to do |format|
      format.html { redirect_to special_abilities_url, notice: 'Special ability was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_special_ability
      @special_ability = SpecialAbility.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def special_ability_params
      params.require(:special_ability).permit(:name, :rule)
    end
end
