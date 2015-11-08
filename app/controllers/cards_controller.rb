class CardsController < ApplicationController
  helper CardsHelper
  before_action :set_card, only: [:show, :edit, :update, :destroy]

  # GET /cards
  # GET /cards.json
  def index
    if user_signed_in?
      @cards = current_user.cards
    else
      redirect_to new_user_session_url
    end
  end

  # GET /cards/1
  # GET /cards/1.json
  def show
  end

  # GET /cards/new
  def new
    @card = Card.new
  end

  # GET /cards/1/edit
  def edit
    if !user_signed_in?
      redirect_to new_user_session_url
    end
  end

  # POST /cards
  # POST /cards.json
  def create
    if user_signed_in?
      @card = current_user.cards.build(card_params)
      respond_to do |format|
        if @card.save
          success_notice = "card created"
          format.html { redirect_to @card, notice: success_notice }
          format.json { render :show, status: :created, location: @card }
        else
          format.html { render :new }
          format.json { render json: @card.errors, status: :unprocessable_entity }
        end
      end
    else
      redirect_to new_user_session_url
    end
  end

  # PATCH/PUT /cards/1
  # PATCH/PUT /cards/1.json
  def update
    if user_signed_in?
      respond_to do |format|
        if @card.update(card_params)
          format.html { redirect_to @card, notice: 'Card was successfully updated.' }
          format.json { render :show, status: :ok, location: @card }
        else
          format.html { render :edit }
          format.json { render json: @card.errors, status: :unprocessable_entity }
        end
      end
    else
      redirect_to new_user_session_url
    end
  end

  # DELETE /cards/1
  # DELETE /cards/1.json
  def destroy
    redirect_to new_user_session_url if !user_signed_in?
    @card.destroy
    respond_to do |format|
      format.html { redirect_to cards_url, notice: 'Card was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  # GET /cards/subtypes.json
  def subtypes
=begin
    if !user_signed_in?
      respond_to do |format|
        format.all { render nothing: true, status: :unauthorized }
      end
    end
=end
    respond_to do |format|
      type_id = params[:type_id]
      type = Type.find(type_id)
      if type == nil
        format.all { render nothing: true, status: :forbidden }
      end

      format.json { render json: type.subtypes.map{ |s| { id: s.id, name: s.name } }, status: :ok }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_card
      if user_signed_in?
        @card = current_user.cards.find(params[:id])
      end
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def card_params
      params.require(:card).permit(
        :image_path, :image_art,
        :attack, :defense, :name, :desc, :color,
        :mana_red, :mana_green, :mana_blue, :mana_black, :mana_white, :mana_none,
        :type, :subtype,
        :special_ability_ids => [])
    end
end
