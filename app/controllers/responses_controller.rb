class ResponsesController < ApplicationController
  before_filter :find_medium
  before_filter :find_response, :only => [:show, :edit, :update, :destroy]

  # GET /responses
  # GET /responses.xml
  def index
    if params[:since]
      @responses = @medium.responses.where("created_at > ", Time.at(params[:since].to_f))
    else
      @responses = @medium.responses.order("offset").all
    end

    respond_to do |wants|
      # wants.html # index.html.erb
      # wants.xml  { render :xml => @responses }
      wants.json  { render :json => @responses }
    end
  end

  # GET /responses/1
  # GET /responses/1.xml
  def show
    respond_to do |wants|
      wants.html # show.html.erb
      wants.xml  { render :xml => @response }
    end
  end

  # GET /responses/new
  # GET /responses/new.xml
  def new
    @response = Response.new

    respond_to do |wants|
      wants.html # new.html.erb
      wants.xml  { render :xml => @response }
    end
  end

  # GET /responses/1/edit
  def edit
  end

  # POST /responses
  # POST /responses.xml
  def create
    @response = Response.new(params[:response])

    respond_to do |wants|
      if @response.save
        flash[:notice] = 'Response was successfully created.'
        wants.html { redirect_to(@response) }
        wants.xml  { render :xml => @response, :status => :created, :location => @response }
      else
        wants.html { render :action => "new" }
        wants.xml  { render :xml => @response.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /responses/1
  # PUT /responses/1.xml
  def update
    respond_to do |wants|
      if @response.update_attributes(params[:response])
        flash[:notice] = 'Response was successfully updated.'
        wants.html { redirect_to(@response) }
        wants.xml  { head :ok }
      else
        wants.html { render :action => "edit" }
        wants.xml  { render :xml => @response.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /responses/1
  # DELETE /responses/1.xml
  def destroy
    @response.destroy

    respond_to do |wants|
      wants.html { redirect_to(responses_url) }
      wants.xml  { head :ok }
    end
  end

  private
  def find_medium
    @medium = Medium.find(params[:medium_id])
  end
  
  def find_response
    @response = Response.find(params[:id])
  end
end
