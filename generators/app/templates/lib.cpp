#include "<%= className %>.h"

void <%= className %>::init() {

}

void <%= className %>::debug(cmmc_debug_cb_t cb) {
  if (cb != NULL) {
    this->_user_debug_cb = cb;
  }
}

