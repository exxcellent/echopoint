package echopoint.command;

import nextapp.echo.app.Command;

/**
 * Created: 2009-apr-13
 */
public class JavaScriptEval implements Command {
    private String javaScript;

    public JavaScriptEval(String javaScript) {
        this.javaScript = javaScript;
    }

    public String getJavaScript() {
        return javaScript;
    }

    public void setJavaScript(String javaScript) {
        this.javaScript = javaScript;
    }
}
