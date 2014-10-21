class ProjectsController < ApplicationController

  include ProjectsHelper

  before_action :set_type, only: [:index]
  before_action :set_project, only: [:show, :destroy]

  def new

  end

  def create
    @project = Project.create(project_params)
    redirect_to project_path(@project)
  end

  def index
    if @type == "deleted"
      @projects = Project.unscoped.where(:trashed => true)
    elsif @type == "latest"
      @projects = Project.all
    else
      @projects = Project.all
    end
  end

  def show

  end

  def destroy
    @project.destroy!
    redirect_to projects_path
  end

  def restore
    @project = Project.unscoped.find(params[:id])
    @project.undestroy!
    redirect_to project_path(@project)
  end

  private

  def project_params
    params[:project].present? ? params.require(:project).permit([:name, :description]) : {}
  end
end
