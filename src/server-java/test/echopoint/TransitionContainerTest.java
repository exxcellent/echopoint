package echopoint;

import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.AfterClass;
import static org.junit.Assert.assertEquals;
import nextapp.echo.app.*;
import nextapp.echo.app.layout.ColumnLayoutData;
import nextapp.echo.app.event.ActionListener;
import nextapp.echo.app.event.ActionEvent;
import nextapp.echo.extras.app.menu.DefaultMenuModel;
import nextapp.echo.extras.app.menu.ItemModel;
import echopoint.jquery.DockMenu;
import echopoint.jquery.TransitionContainer;

import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;

/**
 * Created: 2009-maj-09
 */
public class TransitionContainerTest extends AbstractTest<DockMenu> {
    @BeforeClass
    public static void init() {
        set(new TransitionContainer());
    }

    @Test
    public void renderId() {
        final String renderId = "echopointUnitTestTransitionContainer";
        getComponent().setRenderId(renderId);
        assertEquals("Ensuring renderId set", renderId, getComponent().getRenderId());
    }

    @AfterClass
    public static void finish() {
        final Component content = Application.getContent().getTestArea();
        content.removeAll();
        final TransitionContainer tc = (TransitionContainer) get();
        tc.setType(TransitionContainer.TYPE_FOLD);
        tc.setDuration(1500);

        tc.add(new Label("This is just a test label."));
        ContainerEx cEx = new ContainerEx();
        cEx.setWidth(new Extent(400));
        cEx.setHeight(new Extent(300));
        cEx.setBackground(Color.GREEN);
        tc.add(cEx);

        content.add(tc);

        Button b = new Button("Change label");
        b.addActionListener(new ActionListener() {

            public void actionPerformed(ActionEvent actionEvent) {
                tc.removeAll();
                tc.add(new Label("This is another label"));
                ContainerEx cEx = new ContainerEx();
                cEx.setWidth(new Extent(500));
                cEx.setHeight(new Extent(400));
                cEx.setBackground(Color.BLUE);
                tc.add(cEx);
            }
        });
        content.add(b);


    }
}

