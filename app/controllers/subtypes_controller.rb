class SubtypesController < ApplicationController
  before_action :set_subtype, only: [:show, :edit, :update, :destroy]

  # GET /subtypes
  # GET /subtypes.json
  def index
    @subtypes = Subtype.all
  end

  # GET /subtypes/1
  # GET /subtypes/1.json
  def show
  end

  # GET /subtypes/new
  def new
    @subtype = Subtype.new
  end

  # GET /subtypes/1/edit
  def edit
  end

  # POST /subtypes
  # POST /subtypes.json
  def create
    if !user_signed_in?
      redirect_to new_user_session_url
    end

    @subtype = current_user.subtypes.build(subtype_params)
    respond_to do |format|
      if @subtype.save
        #format.html { redirect_to @subtype, notice: 'Subtype was successfully created.' }
        #format.json { render :show, status: :created, location: @subtype }
        format.json   { render json: { subtype: @subtype, status: "ok" } }
      else
        format.json  { render json: { errors: @subtype.errors.full_messages }, status: :ok}
      end
    end
  end

  # PATCH/PUT /subtypes/1
  # PATCH/PUT /subtypes/1.json
  def update
    if !user_signed_in?
      redirect_to new_user_session_url
    end

    respond_to do |format|
      if @subtype.update(subtype_params)
        format.json   { render json: {status: "ok"} }
      else
        format.json  { render json: { errors: @subtype.errors.full_messages }, status: :ok}
      end
    end
  end

  # DELETE /subtypes/1
  # DELETE /subtypes/1.json
  def destroy
    @subtype.destroy
    respond_to do |format|
      format.html { redirect_to subtypes_url, notice: 'Subtype was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_subtype
      @subtype = Subtype.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def subtype_params
      params.require(:subtype).permit(:name, :type_id)
    end
end
