#ifndef <%= className %>_H
#define <%= className %>_H

#include "ESP8266WiFi.h"
#include <functional>

#ifdef ESP8266
extern "C" {
#include "user_interface.h"
}
#endif

enum <%=className%>_mode_t {
    MODE_AP, MODE_STA
};


class <%= className %>
{
public:
    <%=className%>_mode_t mode;

    // constructure
    <%= className %>() {}
    
    ~<%= className %>() {}
    
    void setup();

};

#endif //<%= className %>_H
