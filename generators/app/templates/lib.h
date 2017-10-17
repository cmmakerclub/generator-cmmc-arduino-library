#ifndef <%= className %>_H
#define <%= className %>_H

#include <Arduino.h>


#ifndef CMMC_NO_ALIAS
  #define <%= className %> <%= className %>
#endif

#ifdef ESP8266
  extern "C" {
    #include "user_interface.h"
  }
  #include "ESP8266WiFi.h"
  #include <functional>
#endif

typedef void (*cmmc_debug_cb_t)(const char* message);

class <%= className %>
{
    public:
      // constructor
      <%= className %>() {
        auto blank = [](const char* message) {};
      }

      ~<%= className %>() {}

      void init();
      void debug(cmmc_debug_cb_t);
    private:
      cmmc_debug_cb_t _user_debug_cb;

};

#endif //<%= className %>_H
