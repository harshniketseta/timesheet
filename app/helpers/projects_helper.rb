module ProjectsHelper

  def set_type
    @type = params.fetch(:type, "active")
  end

  def set_project
    begin
      @project = Project.find(params[:id])
    rescue ActiveRecord::RecordNotFound => e
      redirect_to projects_path, :alert => "Project not found" and return if @project.nil?
    end
  end
end
