class TypesController < ApplicationController
  before_action :authenticate_user!, only: [:create, :destroy, :index, :show, :update, :set_type]
  before_action :set_type, only: [:show, :edit, :update, :destroy]

  # GET /types
  # GET /types.json
  def index
    @types = current_user.types
    respond_to do |format|
      format.html { render partial: '/types/index' }
    end
  end

  # GET /types/1
  # GET /types/1.json
  def show
    if @type == nil
      redirect_to new_user_session_url
    end
  end

  # GET /types/subtypes.json 
  def subtypes
    type = Type.find(params[:id])
    if type == nil || (type.user != nil && type.user != current_user)
      respond_to do |format|
        format.json { render nothing: true, status: :forbidden }
      end
    else
      respond_to do |format|
        format.json { render json: type.ordered_subtypes, status: :ok }
      end
    end
  end

  # GET /types/new
  def new
    @type = Type.new
  end

  # GET /types/1/edit
  def edit
    if @type == nil
      redirect_to new_user_session_url
    else
      respond_to do |format|
        format.html { render partial: '/types/edit'}
      end
    end
  end

  # POST /types
  # POST /types.json
  def create
    @type = current_user.types.build(type_params)
    respond_to do |format|
      if @type.save
        format.json { render json: @type, status: :created, location: @type }
      else
        format.json { render json: @type.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /types/1
  # PATCH/PUT /types/1.json
  def update
    if @type == nil
      redirect_to new_user_session_url
      return
    end

    respond_to do |format|
      if @type.update(type_params)
        format.json  { render json: @type, status: :ok }
      else
        format.json  { render json: { errors: @type.errors.full_messages }, status: :ok}
      end
    end
  end

  # DELETE /types/1
  # DELETE /types/1.json
  def destroy
    if @type == nil
      redirect_to new_user_session_url
      return
    end

    @type.destroy
    respond_to do |format|
      format.json { render json: @type, status: :ok }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_type
      type = Type.find(params[:id])
      if type.user == current_user
        @type = type
        @subtype = Subtype.new
      end
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def type_params
      params.require(:type).permit(:name)
    end
end
